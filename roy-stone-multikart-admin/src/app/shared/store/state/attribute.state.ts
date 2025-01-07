import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetAttributes, GetAttributeValues, CreateAttribute, EditAttribute, 
         UpdateAttribute, UpdateAttributeStatus, DeleteAttribute, 
         DeleteAllAttribute, ExportAttribute, ImportAtribute } from "../action/attribute.action";
import { Attribute, AttributeValue } from "../../interface/attribute.interface";
import { AttributeService } from "../../services/attribute.service";
import { NotificationService } from "../../services/notification.service";
import { ImportTag } from "../action/tag.action";

export class AttributeStateModel {
  attribute = {
    data: [] as Attribute[],
    total: 0
  }
  attribute_values: AttributeValue[];
  selectedAttribute: Attribute | null;
}

@State<AttributeStateModel>({
  name: "attribute",
  defaults: {
    attribute: {
      data: [],
      total: 0
    },
    attribute_values: [],
    selectedAttribute: null
  },
})
@Injectable()
export class AttributeState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private attributeService: AttributeService) {}

  @Selector()
  static attribute(state: AttributeStateModel) {
    return state.attribute;
  }

  @Selector()
  static attributes(state: AttributeStateModel) {
    return (ids: string) => {
      let attrIds =  Array.from(new Set(ids.split(','))).map(Number);
      let filter = attrIds.length ? state.attribute.data.filter(attr => !attrIds.includes(Number(attr.id!))) : state.attribute.data;
      return filter.map((attribute: Attribute) => {
        return { label: attribute?.name, value: attribute?.id, attribute_values: attribute?.attribute_values }
      });
    };
  }

  @Selector()
  static attribute_value(state: AttributeStateModel) {
    return (id: number | null) => {
      if(!id) return [];
      return state?.attribute_values.filter(attr_val => +attr_val.attribute_id === id)?.map((value: AttributeValue) => {
        return { label: value?.value, value: value?.id }
      });
    };
  }

  @Selector()
  static selectedAttribute(state: AttributeStateModel) {
    return state.selectedAttribute;
  }

  @Action(GetAttributes)
  getAttributes(ctx: StateContext<AttributeStateModel>, action: GetAttributes) {
    return this.attributeService.getAttributes(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            attribute: {
              data: result.data,
              total: result?.total ? result?.total : result.data.length
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetAttributeValues)
  getAttributeValues(ctx: StateContext<AttributeStateModel>, action: GetAttributeValues) {
    return this.attributeService.getAttributeValues(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            attribute_values: result.data
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateAttribute)
  create(ctx: StateContext<AttributeStateModel>, action: CreateAttribute) {
    return this.attributeService.createAttribute(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            attribute: {
              data: [...state.attribute.data, result],
              total: state?.attribute.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Attribute Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditAttribute)
  edit(ctx: StateContext<AttributeStateModel>, { id }: EditAttribute) {
    return this.attributeService.editAttribute(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedAttribute: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateAttribute)
  update(ctx: StateContext<AttributeStateModel>, { payload, id }: UpdateAttribute) {
    return this.attributeService.updateAttribute(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const attributes = [...state.attribute.data];
            const index = attributes.findIndex(attribute => attribute.id === id);
            attributes[index] = result;

            ctx.patchState({
              ...state,
              attribute: {
                data: attributes,
                total: state.attribute.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Attribute Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateAttributeStatus)
  updateStatus(ctx: StateContext<AttributeStateModel>, { id, status }: UpdateAttributeStatus) {
    return this.attributeService.updateAttributeStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const attributes = [...state.attribute.data];
            const index = attributes.findIndex(attribute => attribute.id === id);
            attributes[index] = result;

            ctx.patchState({
              ...state,
              attribute: {
                data: attributes,
                total: state.attribute.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Attribute Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAttribute)
  delete(ctx: StateContext<AttributeStateModel>, { id }: DeleteAttribute) {
    return this.attributeService.deleteAttribute(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetAttributes({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Attribute Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllAttribute)
  deleteAll(ctx: StateContext<AttributeStateModel>, { ids }: DeleteAllAttribute) {
    return this.attributeService.deleteAllAttribute(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetAttributes({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Attribute Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ImportAtribute)
  import(ctx: StateContext<AttributeStateModel>, action: ImportTag) {
    return this.attributeService.importAttribute(action.payload).pipe(
      tap({
        next: result => {
          this.store.dispatch(new GetAttributes({'page': 1, 'paginate': 15}));
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ExportAttribute)
  export(ctx: StateContext<AttributeStateModel>, action: ExportAttribute) {
    return this.attributeService.exportAttribute().pipe(
      tap({
        next: result => {
          const blob = new Blob([result], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'attributes.csv';
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
