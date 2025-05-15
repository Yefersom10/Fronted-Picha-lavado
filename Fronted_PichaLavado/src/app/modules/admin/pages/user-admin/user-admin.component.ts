import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../service/users.service';
import { Router } from '@angular/router';
import { NavbarAdminComponent } from '../../navbar-admin/navbar-admin.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-admin',
  imports: [NavbarAdminComponent,FormsModule,CommonModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css'
})
export class UserAdminComponent implements OnInit {

  searchTermUser: string = '';
  usuarios: any[] = [];
  newUser: {};
  editingUser: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }

  get filteredUsers() {
    return this.usuarios.filter(u =>
      u.name?.toLowerCase().includes(this.searchTermUser.toLowerCase())
    );
  }

  loadAll() {
    this.usersService.getAll().subscribe(data => {
      console.log('Usuarios cargados:', data);
      this.usuarios = data;
    });
  }
   addUser() {
    this.usersService.create(this.newUser).subscribe(user => {
      this.usuarios.push(user);
      this.newUser = {};
    });
  }

  startEditUser(user: any) {
    this.editingUser = { ...user };
  }

  saveEditUser() {
    this.usersService.update(this.editingUser).subscribe(updated => {
      const index = this.usuarios.findIndex(u => u.id === updated.id);
      this.usuarios[index] = updated;
      this.editingUser = null;
    });
  }

  cancelEditUser() {
    this.editingUser = null;
  }

  deleteUser(id: number) {
    this.usersService.delete(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }

}
