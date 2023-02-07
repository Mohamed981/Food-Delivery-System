import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthinticationService } from 'src/app/services/authintication.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

  userCredentials:any;
  constructor(
    private authService: AuthinticationService,
    private router: Router,
    private _crudService: CrudService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => (this.userCredentials = res));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
