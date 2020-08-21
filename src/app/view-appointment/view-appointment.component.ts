import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { Fitness } from '../place-fitness-trainer-appointment/place-fitness-trainer-appointment.component';
import { error } from 'protractor';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  Fitness: Fitness;
  ngOnInit() {
    this.getfitness();
  }

  getfitness() {
    return this.userService.getfitnessdata().subscribe(
      (data) => {
        this.Fitness = data;
      },
      (error) => console.log(error)
    );
  }

  deletefitness(id){
    if(confirm("Do you want to delete record " + id + " ?")) {
      this.userService.deletefitnessdata(id).subscribe(
        (data) => {
          console.log(data);
          this.getfitness();
        },
        (error) => console.log(error)
      );
    }
  }

  editfitness(fid) {
    this.router.navigate(['/place-fitness-trainer-appointment'],
    {queryParams : {id : fid}});
  }

}
