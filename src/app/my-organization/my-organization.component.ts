/**
 * 
 * A demo application in which there are particular amount 
 * dedicated to each manager / developers / testers and user can
 * form a group of any combination among them (For example: Group A 
 * can have 1 manager (Manager  A) at top of tree and 2 developers + 2 QA Testers under him and so the total amount for Manager A
 * will be calculated accordingly. Similarly Manager B can have 1
 * manager + 1 developer + 1 QA Tester under him and the total
 * amount for Manager B is calculated accordingly. )
 * 
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

enum COST {
  DEVELOPER = 1000,
  TESTER = 500,
  MANAGER = 300
};

@Component({
  selector: 'app-my-organization',
  templateUrl: './my-organization.component.html',
  styleUrls: ['./my-organization.component.css']
})
export class MyOrganizationComponent implements OnInit {

  organizationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { 
    this.organizationForm = this.fb.group({
      dept: new FormArray([])
    });
  }

  ngOnInit() {
  }

  addDeptFormGroup() {
    return this.fb.group({
      manager: new FormArray([]),
    });
  }

  addManagerFormGroup() {
    return this.fb.group({
      manager: new FormArray([]),
      developer: [0],
      tester: [0],
    });
  }

  addSubManagerFormGroup() {
    return this.fb.group({
      developer: [0],
      tester: [0],
    });
  }

  

  addNewDept() {
    (this.organizationForm.controls.dept as FormArray).push(this.addDeptFormGroup());
  }

  addNewManager(i) {
    const managerArray = this.getManagersFormArray(i);
    managerArray.push(this.addManagerFormGroup());
  }

  addSubManager(m: FormGroup) {
    const subManagerArray = m.get('manager') as FormArray;
    subManagerArray.push(this.addSubManagerFormGroup());
  }

  addDeveloper(m: FormGroup) {
    const developer = m.get('developer');
    developer.patchValue(developer.value + 1);
  }

  addTester(m: FormGroup) {
    const tester = m.get('tester');
    tester.patchValue(tester.value + 1);
  }


  getManagersFormArray(i) {
    const deptArray = this.organizationForm.get('dept') as FormArray;
    return (deptArray.at(i) as FormGroup).controls.manager as FormArray;
  }


  calcDeveloperCost(m: FormGroup) {
    return m.get('developer').value * COST.DEVELOPER;
  }

  calcTesterCost(m: FormGroup) {
    return m.get('tester').value * COST.TESTER;
  }

  calcSubManagerCost(e: FormGroup) {
    return this.calcDeveloperCost(e) + this.calcTesterCost(e) + COST.MANAGER;
  }

  calcManagerCost(m: FormGroup) {
    const developerCost = this.calcDeveloperCost(m);
    const testerCost = this.calcTesterCost(m);
    const subManagerCost = (m.get('manager') as FormArray).controls.reduce((total, el: FormGroup) => {
      return total + this.calcSubManagerCost(el);
    }, 0);
    return developerCost + testerCost + subManagerCost + COST.MANAGER;
  }

  calcDeptCost(d) {
    return (d.get('manager') as FormArray).controls.reduce((total, el: FormGroup) => {
      return total + this.calcManagerCost(el);
    }, 0);
  }
}