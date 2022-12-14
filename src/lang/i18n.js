import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import TranslagtionEn from './translation.en.json';
import TranslationKo from './translation.ko.json';

const resource = {
	en: {
		translations: TranslagtionEn,
	},
	ko: {
		translations: TranslationKo,
	},
};

i18n.use(initReactI18next).init({
	resources: resource,
	// 초기 설정 언어
	lng: 'en',
	fallbackLng: 'en',
	debug: true,
	defaultNS: 'translations',
	ns: 'translations',
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
