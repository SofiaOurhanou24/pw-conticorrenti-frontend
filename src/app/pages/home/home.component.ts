import { Component, inject } from '@angular/core';
import { MovimentiService } from '../../core/services/movimenti.service';
import { AuthService } from '../../core/services/auth.service';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // protected movimentiSrv = inject(MovimentiService);
  // protected router = inject(Router);
  // movimenti$ = this.movimentiSrv.movimenti$;
  // goToAssignments(classroomId: string) {
  //   this.router.navigate([`/classrooms/${classroomId}/assignments`]);
  // }
  // trackById(_: any, classroom: Classroom) {
  //   return classroom.id;
  // }
  // onStudentChange(studentId: string, event: Event) {
  //   const checked = (event.target as HTMLInputElement).checked;
  //   const selected = this.selectedStudentsControl?.value || [];
  //   if (checked && !selected.includes(studentId)) {
  //     this.selectedStudentsControl?.setValue([...selected, studentId], {
  //       emitEvent: false,
  //     });
  //   } else if (!checked) {
  //     this.selectedStudentsControl?.setValue(
  //       selected.filter((id) => id !== studentId),
  //       { emitEvent: false }
  //     );
  //   }
  // }
  // addClass(modal: any) {
  //   const { name, selectedStudents } = this.addClassForm.value;
  //   this.classroomSrv.addClassSrv(name!.trim(), selectedStudents!);
  //   modal.close();
  // }
}
