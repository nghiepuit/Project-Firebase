import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Listing } from './../defines/listing.interface';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

	listings: FirebaseListObservable<any[]>;
	listing: FirebaseObjectObservable<any>;
	folder: any;

	constructor(
		private db: AngularFireDatabase
	) {
		this.folder = 'listingimages';
	}

	getListings() {
		this.listings = this.db.list('/listings') as FirebaseListObservable<Listing[]>;
		return this.listings;
	}

	getListingDetails(id) {
		this.listing = this.db.object('/listings/' + id) as FirebaseObjectObservable<Listing>;
		return this.listing;
	}

	addListing(listing) {
		// Create root ref
		let storageRef = firebase.storage().ref();
		for (let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
			let path = `/${this.folder}/${selectedFile.name}`;
			let iRef = storageRef.child(path);
			iRef.put(selectedFile).then((snapshot) => {
				listing.image = selectedFile.name;
				listing.path = path;
				return this.listings.push(listing);
			});
		}
	}

	updateListing(id, listing) {
		return this.listings.update(id, listing);
	}

	deleteListing(id) {
		return this.listings.remove(id);
	}

}