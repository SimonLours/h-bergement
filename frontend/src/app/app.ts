import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // 1. Les outils de navigation

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink], // 2. On les active ici
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { 
  title = 'projet-tableau';
  

}