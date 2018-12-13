// import { Reflection, ReflectionKind, DeclarationReflection } from 'typedoc/dist/lib/models/reflections/index';
// import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
// import { Converter } from 'typedoc/dist/lib/converter/converter';
// import { Context } from 'typedoc/dist/lib/converter/context';
// import { CommentPlugin } from 'typedoc/dist/lib/converter/plugins/CommentPlugin';

import { Reflection, ReflectionKind, DeclarationReflection } from 'typedoc';
import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Converter } from 'typedoc/dist/lib/converter/converter';
import { Context } from 'typedoc/dist/lib/converter/context';
import { CommentPlugin } from 'typedoc/dist/lib/converter/plugins/CommentPlugin';


/**
 * Removes all "symbols" that miss a comment starting with dash-double-star
 */
@Component({ name: 'remove-non-doc' })
export class RemoveNonDocPlugin extends ConverterComponent {
  /**
   * A list of classes/interfaces that don't inherit reflections.
   */
  private exclude: DeclarationReflection[];

  /**
   * Create a new CommentPlugin instance.
   */
  initialize() {
    console.log(`RemoveNonDocPlugin.initialize`);
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
      [Converter.EVENT_FUNCTION_IMPLEMENTATION]: this.onFunction,
      [Converter.EVENT_RESOLVE]: this.onResolve,
      [Converter.EVENT_RESOLVE_END]: this.onEndResolve,
      [Converter.EVENT_CREATE_SIGNATURE]: this.onDeclaration/*this.onSignature*/
    });
  }

  /**
   * Triggered when the converter begins converting a project.
   *
   * @param context  The context object describing the current state the converter is in.
   */
  private onBegin(context: Context) {
    console.log(`RemoveNonDocPlugin.onBegin`);
    //throw "RemoveNonDocPlugin test EXCEPTION!!!";
    this.exclude = [];
  }

  /**
   * Triggered when the converter has created a declaration or signature reflection.
   *
   * Add to the list of classes/interfaces that don't inherit docs.
   *
   * @param context  The context object describing the current state the converter is in.
   * @param reflection  The reflection that is currently processed.
   * @param node  The node that is currently processed if available.
   */
  private onDeclaration(context: Context, reflection: DeclarationReflection, node?) {
    // only if it's a DeclarationReflection and has a comment with @noinheritdoc tag

    //let isDecl = reflection instanceof DeclarationReflection;
    // if (!reflection.kindOf(ReflectionKind.SomeModule) && reflection.comment == null) {
    //     this.exclude.push(<any>reflection);
    // }

    switch (reflection.kind) {
        case ReflectionKind.Global:
        case ReflectionKind.ExternalModule:
        case ReflectionKind.Module:
        case ReflectionKind.EnumMember:
        case ReflectionKind.IndexSignature:
        case ReflectionKind.ConstructorSignature:
        case ReflectionKind.Parameter:
        case ReflectionKind.TypeLiteral:
        case ReflectionKind.TypeParameter:
        case ReflectionKind.GetSignature:
        case ReflectionKind.SetSignature:
        case ReflectionKind.ObjectLiteral:
        case ReflectionKind.Event: //???
            break;
        case ReflectionKind.Function:
        case ReflectionKind.Method:
            // if (!reflection.signatures.some((sig)=>sig.hasComment())) {
            //     //this.exclude.push(reflection);
            // }
            break;
        case ReflectionKind.Enum:
        case ReflectionKind.Variable:
        case ReflectionKind.Class:
        case ReflectionKind.Interface:
        case ReflectionKind.Constructor:
        case ReflectionKind.Property:
        case ReflectionKind.Accessor:
        case ReflectionKind.TypeAlias: //???
            if (!reflection.hasComment()) {
                this.exclude.push(reflection);
            }
            break;
        case ReflectionKind.CallSignature: //!!!
            if (!reflection.hasComment()) {
                this.exclude.push(<DeclarationReflection>reflection.parent);
            }
            break;
    }  




    // if (!(node && reflection instanceof DeclarationReflection &&
    //   reflection.kindOf(ReflectionKind.ClassOrInterface) &&
    //   reflection.comment && reflection.comment.hasTag('noinheritdoc'))) {
    //   return;
    // }

    // this.noInherit.push(reflection);
    // CommentPlugin.removeTags(reflection.comment, 'noinheritdoc');
    console.log(`RemoveNonDocPlugin.onDeclaration`);
  }

  private onSignature(context: Context, reflection: Reflection, node?) {
      let bbb = true;
  }

  private onFunction(a,b,s){
      let bbb = true;
  }

  private onResolve(context: Context, reflection: DeclarationReflection, node?) {

    switch (reflection.kind) {
        case ReflectionKind.Global:
        case ReflectionKind.ExternalModule:
        case ReflectionKind.Module:
        case ReflectionKind.EnumMember:
        case ReflectionKind.IndexSignature:
        case ReflectionKind.ConstructorSignature:
        case ReflectionKind.Parameter:
        case ReflectionKind.TypeLiteral:
        case ReflectionKind.TypeParameter:
        case ReflectionKind.GetSignature:
        case ReflectionKind.SetSignature:
        case ReflectionKind.ObjectLiteral:
        case ReflectionKind.Event: //???
            break;
        case ReflectionKind.Function:
        case ReflectionKind.Method:
            if (!reflection.signatures.some((sig)=>sig.hasComment())) {
                //this.exclude.push(reflection);
            }
            break;
        case ReflectionKind.Enum:
        case ReflectionKind.Variable:
        case ReflectionKind.Class:
        case ReflectionKind.Interface:
        case ReflectionKind.Constructor:
        case ReflectionKind.Property:
        case ReflectionKind.Accessor:
        case ReflectionKind.TypeAlias: //???
        case ReflectionKind.CallSignature: //!!!
            if (!reflection.hasComment()) {
                //this.exclude.push(reflection);
            }
            break;
    }  
}

  /**
   * Triggered when the converter begins resolving a project.
   *
   * @param context  The context object describing the current state the converter is in.
   */
  private onBeginResolve(context: Context) {
    console.log(`RemoveNonDocPlugin.onBeginResolve`);

      this.exclude.forEach((removed: DeclarationReflection) => {
        CommentPlugin.removeReflection(context.project, removed);
      });

    // if (this.noInherit) {
    //   const removals = [];
    //   this.noInherit.forEach((reflection: DeclarationReflection) => {
    //     reflection.children.forEach((child: Reflection) => {
    //       if (child instanceof DeclarationReflection && child.inheritedFrom &&
    //         (!child.overwrites || (child.overwrites && child.overwrites !== child.inheritedFrom))) {
    //         removals.push(child);
    //       }
    //     });
    //   });
    //   removals.forEach((removed: DeclarationReflection) => {
    //     CommentPlugin.removeReflection(context.project, removed);
    //   });
    // }

  }

  private onEndResolve(context: Context) {
    console.log(`RemoveNonDocPlugin.onEndResolve`);

    // this.exclude.forEach((removed: DeclarationReflection) => {
    //     CommentPlugin.removeReflection(context.project, removed);
    // });
  }

}