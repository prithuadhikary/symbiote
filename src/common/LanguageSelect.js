import { Button, Dropdown } from "flowbite-react";
import { useCallback, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const availableLocales = useMemo(() => Object.keys(i18n.services.resourceStore.data), [i18n])

    const nameGenerators = useCallback(() => {
        const [selLang,] = selectedLanguage.split('-');
        const regionGenerator = new Intl.DisplayNames([selLang], { type: 'region' });
        const languageGenerator = new Intl.DisplayNames([selLang], { type: 'language' });
        return { regionGenerator, languageGenerator };
    }, [selectedLanguage])


    const items = useMemo(() => {
        return (availableLocales.map((languageCode, id) => {
            const [lang, country] = languageCode.split('-');
            const { regionGenerator, languageGenerator } = nameGenerators();
            const countryName = regionGenerator.of(country);
            const languageName = languageGenerator.of(lang);
            console.log(countryName);
            return (
                <Dropdown.Item
                    key={id}
                    onClick={() => {
                        i18n.changeLanguage(languageCode);
                        setSelectedLanguage(languageCode);
                    }}>
                    <div className="inline-block px-1">
                        <ReactCountryFlag countryCode={country} />
                    </div>
                    {countryName} ({languageName})
                </Dropdown.Item>
            );
        }));
    }, [availableLocales, selectedLanguage]);

    return (<Dropdown label="Select Language" size="xs" renderTrigger={() => {
        const { regionGenerator, languageGenerator } = nameGenerators();
        const [selLang, selCountry] = selectedLanguage.split('-');
        const selectedRegion = regionGenerator.of(selCountry);
        const selectedLang = languageGenerator.of(selLang);
        return (<Button size="sm" color="white">
            <div className="inline-block px-1">
                <ReactCountryFlag countryCode={selCountry} />
            </div>
            {selectedRegion} ({selectedLang})
        </Button>)
    }}>
        {items}
    </Dropdown>)
}

export default LanguageSelect;