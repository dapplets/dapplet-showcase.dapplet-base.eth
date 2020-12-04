import { } from '@dapplets/dapplet-extension';
import DAPPLETS_ICON from './icon.png';

@Injectable
export default class TwitterFeature {
    public config: any;

    constructor(
        @Inject("twitter-adapter.dapplet-base.eth")
        public adapter: any
    ) {
        const { button } = this.adapter.exports;
        this.config = {
            POST_SOUTH: [
                button({
                    "DEFAULT": {
                        label: 'Dapplets',
                        img: DAPPLETS_ICON,
                        exec: (ctx, me) => alert('Hello, World!')
                    }
                })
            ]
        }

        this.adapter.attachConfig(this.config);
    }
}
