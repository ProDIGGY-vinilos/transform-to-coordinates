import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Address } from '../model/address';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  async getLatLong(address: Address): Promise<Observable<Address>> {
    return await this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=
    ${address.domicilio}&key=${import.meta.env['NG_APP_API']}`
      )
      .pipe(
        map((data: any) => {
          if (data.status !== 'ZERO_RESULTS') {
            address.lat = data.results[0].geometry.location.lat;
            address.long = data.results[0].geometry.location.lng;
            address.location_type = data.results[0].geometry.location_type;
            return address;
          } else {
            address.lat = 0;
            address.long = 0;
            address.location_type = 'ZERO_RESULTS';
            return address;
          }
        })
      );
  }
}
