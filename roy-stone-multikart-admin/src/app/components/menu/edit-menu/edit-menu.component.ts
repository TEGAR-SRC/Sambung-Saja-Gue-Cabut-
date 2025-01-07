import { Component } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-menu',
  standalone: true,
  imports: [MenuComponent, FormsModule],
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.scss'
})
export class EditMenuComponent {

}
