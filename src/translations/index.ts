import es from './es.json';
import en from './en.json';
import fr from './fr.json';

export type Language = 'es' | 'en' | 'fr';

export const translations = {
  es,
  en,
  fr
};

export type TranslationKey = string;

// Helper type to get nested property type
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TranslationKeys = NestedKeyOf<typeof es>;
