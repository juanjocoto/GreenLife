import 'hammerjs';

import { GreenlifeAppModule } from './app.module';
import { ProdConfig } from './blocks/config/prod.config';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(GreenlifeAppModule)
.then((success) => console.log(`Application started`))
.catch((err) => console.error(err));
