import { translationUtils } from "@gooddata/util";
import { memoize } from "lodash";

import enUS from "../translations/en-US.json";
import deDE from "../translations/de-DE.json";
import esES from "../translations/es-ES.json";
import frFR from "../translations/fr-FR.json";
import jaJP from "../translations/ja-JP.json";
import nlNL from "../translations/nl-NL.json";
import ptBR from "../translations/pt-BR.json";
import ptPT from "../translations/pt-PT.json";
import zhHans from "../translations/zh-Hans.json";

export const DEFAULT_LANGUAGE = "en-US";

export const messagesMap = {
    "en-US": translationUtils.removeMetadata(enUS),
    "de-DE": deDE,
    "es-ES": esES,
    "fr-FR": frFR,
    "ja-JP": jaJP,
    "nl-NL": nlNL,
    "pt-BR": ptBR,
    "pt-PT": ptPT,
    "zh-Hans": zhHans,
};

const getMessagesForCurrentLocale = memoize((locale: string) => ({
    ...messagesMap[DEFAULT_LANGUAGE],
    ...messagesMap[locale],
}));

export const getIntlOptions = (locale = DEFAULT_LANGUAGE) => {
    const messages = getMessagesForCurrentLocale(locale);
    return { locale, messages };
};
