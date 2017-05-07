import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-listing',
	templateUrl: './add-listing.component.html',
	styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {

	title: any;
	owner: any;
	city: any;
	bedrooms: any;
	type: any;
	image: any;
	price: any;

	constructor(
		private _firebaseService: FirebaseService,
		private _router : Router
	) { }

	ngOnInit() {
	}

	onSubmit(){
		let listing = {
			title : this.title,
			city : this.city,
			owner : this.owner,
			bedrooms : this.bedrooms,
			type : this.type,
			price : this.price
		}
		this._firebaseService.addListing(listing);
		this._router.navigate(['listings']);
	}

}
