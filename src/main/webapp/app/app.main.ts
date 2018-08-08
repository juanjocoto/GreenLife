import 'hammerjs';

import { GreenlifeAppModule } from './app.module';
import { ProdConfig } from './blocks/config/prod.config';
import localeEsCR from '@angular/common/locales/es-CR';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEsCR);

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(GreenlifeAppModule)
    .then((success) => console.log(`Application started`))
    .catch((err) => console.error(err));
