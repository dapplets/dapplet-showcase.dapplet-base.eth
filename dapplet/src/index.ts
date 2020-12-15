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
                        exec: async (ctx, me) => {
                            const account = adapter.getCurrentUser();
                            const wallet = await Promise.resolve(Core.wallet({ ...account, domainId: 1 }));
                            wallet.sendAndListen('eth_accounts', [], {
                                result: (op, { type, data }) => {
                                    const address = data[0];
                                    wallet.sendAndListen('personal_sign', [ctx.text, address], {
                                        result: (op, { type, data }) => me.setState("SIGNED")
                                    });
                                }
                            });
                            me.setState("PENDING");
                        }
                    },
                    "SIGNED": {
                        label: 'Signed',
                        img: DAPPLETS_ICON,
                        exec: (ctx, me) => {
                            me.setState("DEFAULT");
                        }
                    },
                    "PENDING": {
                        label: 'Pending',
                        disabled: true,
                        img: DAPPLETS_ICON
                    }
                })
            ]
        }

        this.adapter.attachConfig(this.config);
    }
}
