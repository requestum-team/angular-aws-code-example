import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '@directives/click-outside/click-outside.directive';
import { ImagePlaceholderDirective } from '@directives/image-placeholder/image-placeholder.directive';
import { DndFileDirective } from '@directives/dnd-file/dnd-file.directive';

@NgModule({
  declarations: [ImagePlaceholderDirective, ClickOutsideDirective, DndFileDirective],
  exports: [ImagePlaceholderDirective, ClickOutsideDirective, DndFileDirective],
  imports: [CommonModule]
})
export class DirectivesModule {}
