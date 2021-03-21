import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { ApiService } from 'src/app/service/api.service';
import { data, FAQ } from '../../model/data';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq = [];
  showAdmin = false;
  faqList: Array<FAQ> = [];
  name;
  msg:boolean=false;
  message;
  faqSearch: FAQ;
  loginDetails;

  constructor(public commonService: CommonService, public apiService: ApiService) {
    console.log(this.commonService.loginDetails)
    if (this.commonService.loginDetails != undefined) {
      this.loginDetails = 'Welcome ' + this.commonService.loginDetails;
    }
    console.log('login==', this.loginDetails)
   }

  ngOnInit(): void {
    let faqBean = new FAQ();
    faqBean.faqsQues = '';
    faqBean.faqsAns = '';
    faqBean.id = null;
    faqBean.status = true;
    this.faqList.push(faqBean)
    this.faqSearch = new FAQ();
    this.faqSearch.id = 1;
    
    this.apiService.postAPICall(this.faqSearch, 'getFAQs').subscribe(
      data => {
        this.faq = data;
        console.log(this.faq)
      },
      error => {

      }
    );
    if (this.commonService.login && this.commonService.loginRole == 'SUPERADMIN') {
      this.showAdmin = true;
    } else {
      this.showAdmin = false;
    }
  }
  // config = {
  //   allowedContent: false,
  //   extraPlugins: 'divarea',
  //   forcePasteAsPlainText: true
  // };
  config = {
    uiColor: '#ffffff',
    toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
    { name: 'links' }, { name: 'insert' },
    { name: 'document', groups: ['mode', 'document', 'doctools'] },
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
    { name: 'styles' },
    { name: 'colors' }],
    skin: 'kama',
    resize_enabled: false,
    removePlugins: 'elementspath,save,magicline,toolbar',
    extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
    colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
    },
    height: 188,
    removeDialogTabs: 'image:advanced;link:advanced',
    removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
    format_tags: 'p;h1;h2;h3;pre;div',
    allowedContent: false,
    forcePasteAsPlainText: true,
  }

  onSubmit() {
    console.log('faq list---', this.faqList)
    let sumbitObj = new data();
    sumbitObj.faqList = this.faqList;
    this.apiService.postAPICall(sumbitObj, 'saveFAQs').subscribe(
        data => {
          // this.faq = data.faqs;
          // this.faq = this.faq.replace(/<[^>]*>/g, '');
          this.msg = true;
          this.message = 'FAQ saved successfully';
          setTimeout(() => { this.msg = false; }, 15000);
          window.scrollTo(0, 0);
        },
        error => {
  
        }
      );
  }


  add() {
    let faqBean = new FAQ();
    faqBean.faqsQues = '';
    faqBean.faqsAns = '';
    faqBean.id = null;
    faqBean.status = true;
    this.faqList.push(faqBean)
  }

  onEdit() {
    console.log(this.name);
    // this.faqBean.faqs = this.name;
    // this.apiService.postAPICall(this.faqBean, 'saveFAQs').subscribe(
    //   data => {
    //     this.faq = data;
    //   },
    //   error => {

    //   }
    // );
    if (this.commonService.login && this.commonService.loginRole == 'ADMIN') {
      this.showAdmin = true;
    } else {
      this.showAdmin = false;
    }
  }
}
