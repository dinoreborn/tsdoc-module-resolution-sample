/**
 * This is a documentation for the MyModule module. The module contains [[MyClass]] and [[DerivedClass]] classes.
 */

/*
 * This is an undocumented local variable.
 */
var v: any;

/**
 * This is a module level variable.
 */
export var moduleVar: string;

/**
 * This is a module level function.
 * @param value The value to process.
 * @returns A numeric result.
 */
export function moduleFunction(value: string): number {
    return 0;
}

/**
 * This is my class.
 */
export class MyClass {
    /**
    * This is a field.
    */
    myField: number;

    /*
    * This is an internal field. It should not appear in the documentation.
    */
    _internalField: boolean;

    _noCommentAtAll: string;

    /**
    * This is the main property of the [[MyClass]] class.
    */
    get mainProp(): string {
        return '';
    }
    set mainProp(value: string) {
    }

    /**
     * The valueChanged event.
     */
    valueChanged = new Event(123);

    /*
    * This is an internal property. It should not appear in the documentation.
    */
    get _internalProp(): number {
        return 123;
    }

    /**
    * This is a property with the complex return type, as opposite to the [[mainProp]] property
    * return type.
    *
    * We don't use complex types in Wijmo now but would like to start doing this.
    */
    get numberOrString(): number | string {
        return true ? 123 : 'abc';
    }
    set numberOrString(value: number | string) {
    }

    /**
     * This is a public method with two parameters.
     * @param theNumber This is a parameter of the numeric type.
     * @param theString This is a parameter of the string type.
     * @returns A boolean result value.
     */
    theMethod(theNumber: number, theString: string): boolean {
        return true;
    } 

    /*
     * This is an internal method, it should not appear in the documentation.
     */
    _internalMethod() {
    }

}

/**
 * This class is derived from the [[MyClass]] class.
 */
export class DerivedClass extends MyClass {
    /**
    * Returns an actual value of the [[MyClass.mainProp]] property.
    */
    get mainPropActual(): string {
        return this.mainProp;
    }

    /**
     * Overrides the base [[MyClass.theMethod]] method.
     * @param theNumber This is a parameter of the numeric type.
     * @param theString This is a parameter of the string type.
     * @returns A boolean result value.
     */
    theMethod(theNumber: number, theString: string): boolean {
        return super.theMethod(theNumber, theString);
    } 

    /**
     * This is a method with complex type parameter and return class.
     * @param value Boolean or [[MyClass]] instance.
     * @returns A string or [[DerivedClass]] instance.
     */
    complexTypeMethod(value: boolean | MyClass): string | DerivedClass {
        return null;
    }
}

export class Event {
    constructor(p?: any){

    }
}