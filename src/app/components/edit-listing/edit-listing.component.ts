import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-edit-listing',
	templateUrl: './edit-listing.component.html',
	styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {

	id: any;
	title: any;
	owner: any;
	city: any;
	bedrooms: any;
	type: any;
	image: any;
	price: any;

	constructor(
		private _firebaseService: FirebaseService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.id = this._activatedRoute.snapshot.params['id'];
		this._firebaseService.getListingDetails(this.id).subscribe(listing => {
			this.title = listing.title;
			this.owner = listing.owner;
			this.city = listing.city;
			this.bedrooms = listing.bedrooms;
			this.type = listing.type;
			this.price = listing.price;
		});
	}

	onSubmit() {
		let listing = {
			title: this.title,
			city: this.city,
			owner: this.owner,
			bedrooms: this.bedrooms,
			type: this.type,
			price: this.price
		}
		this._firebaseService.updateListing(this.id, listing);
		this._router.navigate(['listings']);
	}

}
