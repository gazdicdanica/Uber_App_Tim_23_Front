import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, EventEmitter, OnInit, Output, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../auth/auth.service';
import { Review } from '../../model/review';
import { UserShort } from '../../model/UserShort';
import { ReviewService } from '../../services/ride/review.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit{

  driverRating : number = 0;
  vehicleRating : number = 0;

  rideId : number = 0;
  passenger!: UserShort;

  ratingArrDriver : any = [];
  ratingArrVehicle : any = [];

  review = new FormGroup({
    driverComment : new FormControl(''),
    vehicleComment: new FormControl('')
  });

  constructor(private dialogRef: MatDialogRef<ReviewDialogComponent>, @Inject(MAT_DIALOG_DATA) data : any,
  private reviewService: ReviewService, private authService : AuthService){
    this.rideId = data.rideId;
    this.passenger = data.passenger;
  }

  ngOnInit(): void {
    for(let i = 0; i < 5; i++){
      this.ratingArrDriver.push(i);
      this.ratingArrVehicle.push(i);
    }
  }

  rate(rating : number, driver : boolean){
    console.log(rating);
    if(driver){this.driverRating = rating}
    else {this.vehicleRating = rating}
  }

  showIcon(index:number, driver: boolean) {
    if(driver){
      if (this.driverRating >= index + 1) {
      return 'star';
      } else {
        return 'star_border';
      }
    }else{
      if (this.vehicleRating >= index + 1) {
        return 'star';
        } else {
          return 'star_border';
        }
    }
  }

  submit(){
    let driverValid = false;
    let vehicleValid = false;

    if(this.review.value.driverComment !== null && this.review.value.driverComment !== undefined){
      if(this.driverRating === 0){
        alert("Please leave a rating for driver");
      }else{
        let comment : string = this.review.value.driverComment;
        this.reviewService.createReviewDriver(new Review(0, this.driverRating, comment,  this.passenger), this.rideId).subscribe(
        );
        driverValid = true;
      }
    }
    if(this.review.value.vehicleComment !== null && this.review.value.vehicleComment !== undefined){
      if(this.vehicleRating === 0){
        alert("Please leave a rating for vehicle");

      }else{
        
        let comment : string = this.review.value.vehicleComment;
        this.reviewService.createReviewVehicle(new Review(0, this.driverRating, comment,  this.passenger), this.rideId).subscribe();
        vehicleValid = true;
        
      }
    }

    if(driverValid && vehicleValid){
      this.dialogRef.close();
    }
   
  }

  cancel(){
    this.dialogRef.close();
  }

}
