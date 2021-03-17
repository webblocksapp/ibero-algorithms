import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="wrapper">
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          routerLink="/"
        >
          <img style="max-width: 120px;" src="/assets/images/ibero-icon.png" />
        </a>

        <hr class="sidebar-divider my-0" />

        <li class="nav-item">
          <a class="nav-link" routerLink="/">
            <i class="fas fa-fw fa-cog"></i>
            <span>Algorithms Exercises</span>
          </a>
        </li>

        <hr class="sidebar-divider" />

        <div class="sidebar-heading">Exercises</div>

        <li
          class="nav-item"
          routerLinkActive="active"
          *ngFor="let item of sidebarLinks"
        >
          <a class="nav-link" [routerLink]="item.url">
            <i class="fas fa-pencil-alt"></i>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>

      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <nav
            class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"
          >
            <ul class="navbar-nav ml-auto">
              <li class="nav-item dropdown no-arrow">
                <a class="nav-link">
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">
                    Mauricio rivera
                  </span>
                  <img
                    class="img-profile rounded-circle"
                    src="/assets/images/me.jpeg"
                  />
                </a>
              </li>
            </ul>
          </nav>
          <div class="container-fluid">
            <div class="card shadow mb-4">
              <div class="card-header py-3">
                <h6 class="m-0 font-weight-bold text-primary">
                  {{ title }}
                </h6>
              </div>
              <div class="card-body">
                <router-outlet
                  (activate)="componentAdded($event)"
                ></router-outlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  public sidebarLinks: Array<{ url: string; name: string }> = [
    { url: 'exercise-1', name: '1. Currency conversor' },
    { url: 'exercise-2', name: '2. Courses average' },
    { url: 'exercise-3', name: 'Exercise 3' },
    { url: 'exercise-4', name: 'Exercise 4' },
    { url: 'exercise-5', name: 'Exercise 5' },
  ];
  public title: string = '';

  componentAdded(component: any) {
    this.title = component?.title;
  }
}
