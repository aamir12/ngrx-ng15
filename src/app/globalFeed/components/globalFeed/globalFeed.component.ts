import { Component } from "@angular/core";
import { BannerComponent } from "src/app/shared/components/banner/banner.component";
import { FeedComponent } from "src/app/shared/components/feed/feed.component";

@Component({
    standalone:true,
    templateUrl:'./globalFedd.component.html',
    selector:'mc-global-feed',
    imports:[
        FeedComponent,
        BannerComponent
    ]
})
export class GlobalFeedComponent {
    apiUrl = '/articles'
}