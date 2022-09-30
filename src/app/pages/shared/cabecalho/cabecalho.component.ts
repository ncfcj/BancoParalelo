import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { faSackDollar } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deslogar(): void{
    this.snackbar.open("Deslogando...", "", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 1000,
      panelClass: ['sucesso-snackbar']
    })
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 1000);

  }

  //FA icons
  faSackDollar = faSackDollar;
}
