import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient) { }
  requestOptions:any = {}


  urlHost:string = "http://localhost:3000"

  Post(url:string,payload:any) {
    let promise = new Promise((resolve, reject) => {


        this.requestOptions = {
          header: new HttpHeaders({
            //''
          }),
          withCredentials:true
        }


      this.http.post(url,payload, this.requestOptions).toPromise()
        .then((res:any) => {
          console.log(res)
          resolve(res)
        }).catch((error) => {
          console.log(error)
          reject(error)
        })     

    }) 

   return promise 
  }

  Get(url:string) {
    let promise = new Promise((resolve, reject) => {

      this.requestOptions = {
        header: new HttpHeaders({
          //''
        }),
        withCredentials:true
      }


      this.http.get(url,this.requestOptions).toPromise()
        .then((res:any) => {
          resolve(res)
        }).catch((error) => {
          reject(error)
        })     

    }) 

   return promise 
  }

  Put(url:string,payload:any) {
    let promise = new Promise((resolve, reject) => {

      this.requestOptions = {
        header: new HttpHeaders({
          //''
        }),
        withCredentials:true
      }


      this.http.put(url,payload, this.requestOptions).toPromise()
        .then((res:any) => {
          resolve(res)
        }).catch((error) => {
          reject(error)
        })     

    }) 

   return promise 
  }

  Delete(url:string,payload:any) {

    
    let promise = new Promise((resolve, reject) => {




      this.http.delete(url,payload,).toPromise()
        .then((res:any) => {
          resolve(res)
        }).catch((error) => {
          reject(error)
        })     

    }) 

   return promise 
  }

  Upload(file:File, destino:string):Observable<any>{

    const formdata:FormData = new FormData()
    formdata.append('userFile', file)
    return this.http.post(this.urlHost + destino, formdata)
  }
}
