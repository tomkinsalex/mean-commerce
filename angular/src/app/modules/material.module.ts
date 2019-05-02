import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatTableModule, MatIconModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [MatSnackBarModule, MatTabsModule, MatRadioModule, MatInputModule, MatButtonModule,
    MatSidenavModule, MatToolbarModule, MatCardModule, MatDialogModule, MatListModule,
    MatTableModule, MatSlideToggleModule, MatProgressSpinnerModule, MatTableModule, MatIconModule],
  exports: [MatSnackBarModule, MatTabsModule, MatRadioModule, MatInputModule, MatButtonModule,
    MatSidenavModule, MatToolbarModule, MatCardModule, MatDialogModule, MatListModule,
    MatTableModule, MatSlideToggleModule, MatProgressSpinnerModule, MatTableModule, MatIconModule]
})
export class MaterialModule { }