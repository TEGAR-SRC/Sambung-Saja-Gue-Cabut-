import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetTags, CreateTag, EditTag, 
         UpdateTag, UpdateTagStatus, DeleteTag, 
         DeleteAllTag, 
         ExportTag,
         ImportTag} from "../action/tag.action";
import { Tag } from "../../interface/tag.interface";
import { TagService } from "../../services/tag.service";
import { NotificationService } from "../../services/notification.service";

export class TagStateModel {
  tag = {
    data: [] as Tag[],
    total: 0
  }
  selectedTag: Tag | null;
}

@State<TagStateModel>({
  name: "tag",
  defaults: {
    tag: {
      data: [],
      total: 0
    },
    selectedTag: null
  },
})
@Injectable()
export class TagState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private tagService: TagService) {}

  @Selector()
  static tag(state: TagStateModel) {
    return state.tag;
  }

  @Selector()
  static selectedTag(state: TagStateModel) {
    return state.selectedTag;
  }

  @Action(GetTags)
  getTags(ctx: StateContext<TagStateModel>, action: GetTags) {
    return this.tagService.getTags(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            tag: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateTag)
  create(ctx: StateContext<TagStateModel>, action: CreateTag) {
    return this.tagService.createTag(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            tag: {
              data: [...state.tag.data, result],
              total: state?.tag.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Tag Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditTag)
  edit(ctx: StateContext<TagStateModel>, { id }: EditTag) {
    return this.tagService.editTag(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedTag: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateTag)
  update(ctx: StateContext<TagStateModel>, { payload, id }: UpdateTag) {
    return this.tagService.updateTag(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const tags = [...state.tag.data];
            const index = tags.findIndex(tag => tag.id === id);
            tags[index] = result;

            ctx.patchState({
              ...state,
              tag: {
                data: tags,
                total: state.tag.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Tag Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateTagStatus)
  updateStatus(ctx: StateContext<TagStateModel>, { id, status }: UpdateTagStatus) {
    return this.tagService.updateTagStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const tags = [...state.tag.data];
            const index = tags.findIndex(tag => tag.id === id);
            tags[index] = result;

            ctx.patchState({
              ...state,
              tag: {
                data: tags,
                total: state.tag.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Tag Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteTag)
  delete(ctx: StateContext<TagStateModel>, { id }: DeleteTag) {
    return this.tagService.deleteTag(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetTags({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Tag Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllTag)
  deleteAll(ctx: StateContext<TagStateModel>, { ids }: DeleteAllTag) {
    return this.tagService.deleteAllTag(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetTags({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Tag Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ImportTag)
  import(ctx: StateContext<TagStateModel>, action: ImportTag) {
    return this.tagService.importTag(action.payload).pipe(
      tap({
        next: result => {
          this.store.dispatch(new GetTags({'page': 1, 'paginate': 15}));
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ExportTag)
  export(ctx: StateContext<TagStateModel>, action: ExportTag) {
    return this.tagService.exportTag().pipe(
      tap({
        next: result => {
          const blob = new Blob([result], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'tag.csv';
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
