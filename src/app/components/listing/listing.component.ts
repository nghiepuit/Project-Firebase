import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
	selector: 'app-listing',
	templateUrl: './listing.component.html',
	styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

	id: any;
	listing: any;
	imageUrl: any;

	constructor(
		private _firebaseService: FirebaseService,
		private _routerService: Router,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit() {
		this.id = this._activatedRoute.snapshot.params['id'];
		this._firebaseService.getListingDetails(this.id).subscribe(listing => {
			this.listing = listing;
			let storageRef = firebase.storage().ref();
			let spaceRef = storageRef.child(this.listing.path);
			storageRef.child(this.listing.path).getDownloadURL().then(url => {
				this.imageUrl = url;
			}).catch(err => {
				console.log(err);
			});
		});
	}

	onDeleteListing(){
		this._firebaseService.deleteListing(this.id);
		this._routerService.navigate(['listings']);
	}

}
