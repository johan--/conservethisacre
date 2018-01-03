import { Component, Injector, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../core/models/user';
import * as fromUsers from '../../reducers';
import * as users from '../../actions/users.actions';
import { Store } from '@ngrx/store';
import { overlayConfigFactory } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { UserService } from '../../../core/services/user.service';
import { EditComponent } from '../edit/edit.component';

const DELETE_TITLE = 'Delete User?';
const DELETE_TEXT = 'Are you sure you want to delete this user?';

@Component({
  selector: 'conserve-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  users$: Observable<User[]>;
  busy$: Observable<boolean>;

  constructor(
    private store: Store<fromUsers.UserState>,
    private userService: UserService,
    private modal: Modal,
    private injector: Injector
  ) {
    this.users$ = store.select(fromUsers.getAllUsers);
  }

  ngOnInit() {
  }

  /**
   * Handles click on edit button
   * @param {User} user
   */
  onEditClick(user: User) {
    this.userService.findOneById(user.id).take(1).subscribe(user => {
      // const data = {...p, forestId : p.forest ? p.forest.id : null};
      this.modal.open(EditComponent, overlayConfigFactory({data : user}, null, {injector: this.injector}));
    });

  }

  /**
   * Handles user click on delete data
   */
  onDeleteClick(item: User) {
    this.modal.confirm().title(DELETE_TITLE).body(DELETE_TEXT).open().result
      .then((result) => {
        this.store.dispatch(new users.Delete(item));
      })
      .catch(err => err);
  }

  /**
   * Handles when user clicks Add data
   */
  onAddClick() {
    this.modal.open(EditComponent, overlayConfigFactory({}, null, {injector: this.injector}));
  }
}
