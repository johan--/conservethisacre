import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IForest } from '../../../core/models/forest';
import { Store } from '@ngrx/store';
import * as fromForests from '../../reducers';
import { GapiService } from '../../../gapi/services/gapi.service';
import { DynamicScriptLoaderService } from '../../../core/services/dynamic-script-loader.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forests',
  templateUrl: './forests.component.html',
  styleUrls: ['./forests.component.scss']
})
export class ForestsComponent implements OnInit {

  forests$: Observable<IForest[]>;

  constructor(private store: Store<fromForests.ForestState>, private gapi: GapiService, private dsl: DynamicScriptLoaderService) {
    this.forests$ = store.select(fromForests.selectAll);
  }


  ngOnInit() {
  }

}
