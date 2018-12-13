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
      [Converter.EVENT_CREATE_SIGNATURE]: this.onDeclaration/*this.onSignature*/
    });
  }

  /**
   * Triggered when the converter begins converting a project.
   *
   * @param context  The context object describing the current state the converter is in.
   */
  private onBegin(context: Context) {
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
  }


  /**
   * Triggered when the converter begins resolving a project.
   *
   * @param context  The context object describing the current state the converter is in.
   */
  private onBeginResolve(context: Context) {
      this.exclude.forEach((removed: DeclarationReflection) => {
        CommentPlugin.removeReflection(context.project, removed);
      });
  }


}