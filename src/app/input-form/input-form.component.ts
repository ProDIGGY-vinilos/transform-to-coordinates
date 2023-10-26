import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '../service/address.service';
import { Address } from '../model/address';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent {
  inputForm!: FormGroup;
  address!: Address;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.inputForm = this.initForm();
    this.address = {
      domicilio: '',
      lat: 0,
      long: 0,
      location_type: '',
    };
  }

  private async getLatLong() {
    (await this.addressService.getLatLong(this.address)).subscribe((data) => {
      this.address = data;
    });
  }

  limpiaForm(): void {
    this.inputForm.reset();
    this.address = {
      domicilio: '',
      lat: 0,
      long: 0,
      location_type: '',
    };
  }

  onSubmit(): any {
    console.log('Form submitted!!!');
    this.address = {
      domicilio:
        this.inputForm.value.direccion.trim() +
        ' ' +
        this.inputForm.value.localidad.trim() +
        ' ' +
        this.inputForm.value.provincia.trim() +
        ' ' +
        this.inputForm.value.pais.trim(),
    };
    this.getLatLong();
  }
  initForm(): FormGroup {
    return this.fb.group({
      direccion: ['', Validators.required],
      localidad: ['', Validators.required],
      provincia: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }
}
