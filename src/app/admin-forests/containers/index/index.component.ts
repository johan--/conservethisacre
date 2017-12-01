import { Component, OnInit, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as fromForest from '../../reducers';
import * as forests from '../../actions/forest.actions';
import { IForest } from '../../../core/models/forest';
import { Store } from '@ngrx/store';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { EditComponent } from '../edit/edit.component';
import { overlayConfigFactory } from 'ngx-modialog';

const DELETE_TITLE = 'Delete Forest?';
const DELETE_TEXT = 'Are you sure you want to delete this forest and all related parcels?';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  entryComponents: [EditComponent]
})
export class IndexComponent implements OnInit {

  forests$: Observable<IForest[]>;

  busy$: Observable<boolean>;

  constructor(private store: Store<fromForest.ForestState>, private modal: Modal, private injector: Injector) {
    this.forests$ = store.select(fromForest.selectAll);
    this.busy$ = store.select(fromForest.isForestsBusy);
  }

  ngOnInit() {
  }

  /**
   * Handles when user clicks delete button
   */
  onDeleteClick(item: IForest) {
    this.modal.confirm().title(DELETE_TITLE).body(DELETE_TEXT).open().result
      .then((result) => {
        this.store.dispatch(new forests.Delete(item));
      })
      .catch(err => err);
  }

  /**
   * Handles when user clicks edit button
   * @param {IForest} forest
   */
  onEditClick(forest: IForest) {
    this.modal.open(EditComponent, overlayConfigFactory({data: forest}, null, {injector: this.injector}));
  }

  /**
   * Handles when user clicks Add data
   * @param {IForest} forest
   */
  onAddClick() {
    this.modal.open(EditComponent, overlayConfigFactory({}, null, {injector: this.injector}));
  }
}
