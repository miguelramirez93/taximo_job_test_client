import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

import { FishStoresApiServiceService } from './fish-stores-api-service.service';
import swal from 'sweetalert2';
export interface ExcerciceElement {
  id: number;
  n_shops: number;
  n_paths: number;
  n_fishtypes: number;
}

export interface nodeElement {
  excercice: { n_shops: any; n_paths: any; n_fishtypes: any };
  shopsFishTypesInfo: any[];
  shopsConnInfo: any[];
}

@Component({
  selector: 'app-fish-stores',
  templateUrl: './fish-stores.component.html',
  styleUrls: ['./fish-stores.component.scss']
})
export class FishStoresComponent {
  private excerciceData: any;
  private nodeData: nodeElement;
  private fishtypes: string;
  private nFishTypes: number;
  private fishtypesCount: string;
  private origin: string;
  private target: string;
  private weight: string;
  private viewAll: boolean;
  private edit: boolean;

  //implements OnInit
  constructor(private fishStoresApiService: FishStoresApiServiceService) {}

  displayedColumns: string[] = ['id', 'n_shops', 'n_paths', 'n_fishtypes', 'view'];
  dataSource = new MatTableDataSource<ExcerciceElement>(this.excerciceData);
  selection = new SelectionModel<ExcerciceElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  viewExcercise(element: ExcerciceElement) {
    this.fishStoresApiService.getService('api/v1/excercice/' + element.id).subscribe((data: any) => {
      this.nodeData = data;
      this.viewAll = false;
      this.edit = false;
    });
  }

  addShop() {
    if (this.nodeData.shopsFishTypesInfo === undefined) {
      this.nodeData.shopsFishTypesInfo = [];
    }
    if (this.nodeData.excercice === undefined) {
      this.nodeData.excercice = { n_shops: 0, n_paths: 0, n_fishtypes: 0 };
    }
    this.nodeData.shopsFishTypesInfo.push([this.fishtypes.split(' ').length, this.fishtypes]);
    this.nodeData.excercice.n_shops = this.nodeData.shopsFishTypesInfo.length;
    this.fishtypes = null;
  }

  addRelation() {
    if (this.nodeData.shopsConnInfo === undefined) {
      this.nodeData.shopsConnInfo = [];
    }
    if (this.nodeData.excercice === undefined) {
      this.nodeData.excercice = { n_shops: 0, n_paths: 0, n_fishtypes: 0 };
    }
    this.nodeData.shopsConnInfo.push([parseInt(this.origin), parseInt(this.target), parseInt(this.weight)]);
    this.nodeData.excercice.n_paths = this.nodeData.shopsConnInfo.length;
    this.origin = null;
    this.target = null;
    this.weight = null;
  }

  calculateExcercice() {
    try {
      if (this.edit) {
        this.nodeData.excercice.n_fishtypes = this.nFishTypes;
      }
      this.fishStoresApiService.postService('api/v1/process', this.nodeData).subscribe((data: any) => {
        console.log('data ', data);
        if (data.status === 'success') {
          swal(
            'Result',
            'LittleCat Bag: ' + data.response.lc.bag + ' Time: ' + data.response.lc.timeSpend,
            'success'
          ).then(function(some: any) {
            swal(
              'Result',
              'BigCat Bag: ' + data.response.bc.bag + ' Time: ' + data.response.bc.timeSpend,
              'success'
            ).then(function(some: any) {
              swal('Result', 'Best Time: ' + data.response.minTime, 'success');
            });
          });
        } else {
          swal('Result', data, 'error');
        }
      });
    } catch (error) {
      swal('Result', 'asegurese de llenar todos datos', 'error');
    }
  }

  clean() {
    this.origin = null;
    this.target = null;
    this.weight = null;
    this.fishtypes = null;
    this.nFishTypes = null;
  }

  saveExcercice() {
    try {
      this.fishStoresApiService.postService('api/v1/excercice', this.nodeData).subscribe((data: any) => {
        swal('Result', data.response, data.status);
        this.fishStoresApiService.getService('api/v1/excercice').subscribe((data: any) => {
          this.excerciceData = data;
          this.dataSource = new MatTableDataSource<ExcerciceElement>(this.excerciceData);
          this.selection = new SelectionModel<ExcerciceElement>(true, []);
        });
      });
    } catch (error) {
      swal('Result', 'asegurese de llenar todos datos', 'error');
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  ngOnInit() {
    this.viewAll = true;
    this.fishStoresApiService.getService('api/v1/excercice').subscribe((data: any) => {
      this.excerciceData = data;
      this.dataSource = new MatTableDataSource<ExcerciceElement>(this.excerciceData);
      this.selection = new SelectionModel<ExcerciceElement>(true, []);
    });
  }
}
