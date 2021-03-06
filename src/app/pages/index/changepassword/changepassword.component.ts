import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.less']
})
export class ChangepasswordComponent implements OnInit {
  @ViewChild('header', {static: false}) header: ElementRef;
  @ViewChild('background', {static: false}) background: ElementRef;
  passwordForm;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private message: NzMessageService,
    private router: Router,
    private modalService: NzModalService,
  ) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [this.confirmValidator]]
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.passwordForm.controls.newPassword.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

  ngOnInit() {
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.passwordForm.reset();
    for (const key in this.passwordForm.controls) {
      this.passwordForm.controls[key].markAsPristine();
      this.passwordForm.controls[key].updateValueAndValidity();
    }
  }

  changePassword() {
    this.modalService.warning({
      nzTitle: null,
      nzContent: '<b style="color:#1b86d7;">您确定要修改密码吗？</b>',
      nzOkText: '确定',
      nzOnOk: () => this.changePasswordConfirm(),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  changePasswordConfirm() {
    this.userService.changePassword(this.passwordForm.value).then(res => {
      if (res['data'] == true) {
        this.message.success('密码修改成功，请重新登录');
        delete localStorage['clouduser'];
        setTimeout(() => {
          window.open('/', '_self');
        }, 200);
      } else if (res['data'] == false) {
        this.message.warning('原密码错误');
      } else {
        this.message.error(res['data']);
      }
    });

  }
}

