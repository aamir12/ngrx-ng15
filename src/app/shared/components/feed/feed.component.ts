import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { feedActions } from "./store/actions";
import { CommonModule } from "@angular/common";
import { combineLatest } from "rxjs";
import { selectError, selectFeedData, selectIsLoading } from "./store/reducers";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { ErrorMessageComponent } from "../errorMessage/banner.component";
import { LoadingComponent } from "../loading/loading.component";
import { environment } from "src/environments/environment";
import { PaginationComponent } from "../pagination/pagination.component";


@Component({
    selector:'mc-feed',
    standalone:true,
    templateUrl:'./feed.component.html',
    imports:[
        CommonModule,
        RouterLink,
        ErrorMessageComponent,
        LoadingComponent,
				PaginationComponent
    ]
})
export class FeedComponent implements OnInit {
    @Input('apiUrl') apiUrl:string = ''
    data$ = combineLatest({
			feed: this.store.select(selectFeedData),
			isLoading: this.store.select(selectIsLoading),
			error: this.store.select(selectError),
    });
		
		url = this.router.url.split('?')[0];
		currentPage:number = 0;
		limit = environment.limit
    constructor(
      private store:Store,
      private router:Router,
      private route:ActivatedRoute,
    ){}
    ngOnInit(): void {   
			this.fetchFeed();
			this.route.queryParams.subscribe((params:Params) => {
				this.currentPage = Number(params['page'] || '1');
				this.fetchFeed();
			})
    }

		fetchFeed() {
			this.store.dispatch(feedActions.getFeed({url:this.apiUrl}));
		}
}