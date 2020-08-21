import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'protractor';


export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  fitnessForm: FormGroup;
  FObj: Fitness;
  idToUpdate;
  
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {

    this.fitnessForm = fb.group({
        firstname: ['',[Validators.required]],
        lastname: ['',[Validators.required]],
        age: ['',[Validators.required, Validators.min(18), Validators.max(60)]],
        email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
        phonenumber: ['', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]],
        streetaddress: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
        trainerpreference: ['', [Validators.required]],
        physiotherapist: ['', [Validators.required]],
        packages: ['', [Validators.required]],
        inr: ['', [Validators.required]],
        paisa: ['', [Validators.required]]
    })

   }
  

  ngOnInit() {
    this.idToUpdate = this.route.snapshot.queryParams.id;
    if (this.idToUpdate != undefined) {
      this.getdata();
    }
  }

  getdata() {
    return this.userService.getfitnessdatabyid(this.idToUpdate).subscribe(
      (data) => {
        this.FObj = data;
        this.fitnessForm.patchValue({ firstname: this.FObj.firstname,
        lastname: this.FObj.lastname,
        age: this.FObj.age,
        email: this.FObj.email,
        phonenumber: this.FObj.phonenumber,
        streetaddress: this.FObj.streetaddress,
        city: this.FObj.city,
        state: this.FObj.state,
        country: this.FObj.country,
        pincode: this.FObj.pincode,
        trainerpreference: this.FObj.trainerpreference,
        physiotherapist: this.FObj.physiotherapist,
        packages: this.FObj.packages,
        inr: this.FObj.inr,
        paisa: this.FObj.paisa
        });
      },
      (error) => console.log(error)
    );
  }

  calculate(rate : number, session : number) {
    var total = rate * session;
    this.fitnessForm.patchValue({inr : total, paisa: 0});
  }

  onSubmit() {
    if(this.fitnessForm.valid) {
      let fitness = this.fitnessForm.value;
      if (this.idToUpdate == undefined || this.idToUpdate == null ) {
        // post data
        this.userService.postfitnessdata(fitness).subscribe(data => {
          this.fitnessForm.reset();
        });
      } else {
        // update
        fitness.id = this.idToUpdate;
        this.userService.updatefitnessdata(fitness.id, fitness).subscribe((data) => {
          this.router.navigate(["/view-appointment"]);
        });
      }
    }
    else {
      alert("Please fill the form appropriately");
    }
  }
    
}
