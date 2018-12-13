/**
 * This is a documentation for the OtherModule module. It depends on the MyModule module
 * and contains the [[OtherClass]] class.
 */

import * as myMd from './MyModule';

/**
 * This class is inherited from the [[myMd.DerivedClass]] class.
 */
export class OtherClass extends myMd.DerivedClass {
    /**
     * This is an alternative to the [[myMd.DerivedClass.theMethod]] method and
     * the [[mainProp]] property.
     * @param value A [[myMd.DerivedClass]] instance to process.
     * @returns The resulting [[myMd.MyClass]] instance.
     */
    theOtherMethod(value: myMd.DerivedClass): myMd.MyClass {
        return value;
    }
}

