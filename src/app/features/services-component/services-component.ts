import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  effect,
  HostListener,
  OnInit,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { Category } from '../models/common.interface';
import { SharedService } from '../../shared/services/shared-service';
import { API_URL } from '../../constants/rest-url';

@Component({
  selector: 'app-services-component',
  imports: [CommonModule],
  templateUrl: './services-component.html',
  styleUrl: './services-component.scss',
})
export class ServicesComponent implements OnInit {
  constructor(readonly sharedService: SharedService) {
    effect(() => {
      this.categories.set(this.sharedService.$categories());
      // The categories can be populated after the initial lifecycle hooks.
      setTimeout(() => this.checkDescriptions());
    });
  }
  ngOnInit(): void {
    this.checkDescriptions();
  }
  categories = signal<Category[]>([]);
  baseUrl = API_URL.BASEURL;
  expandedCategories = new Set<string>();
  truncatedDescriptions = new Map<string, string>();
  showMoreMap = new Map<string, boolean>();
  @ViewChildren('descriptionElement')
  descriptionElements!: QueryList<ElementRef>;

  @HostListener('window:resize')
  onResize(): void {
    setTimeout(() => {
      this.checkDescriptions();
    });
  }

  toggleDescription(categoryId: string): void {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
    }
  }

  isExpanded(categoryId: string): boolean {
    return this.expandedCategories.has(categoryId);
  }

  getDescription(category: Category): string {
    if (this.isExpanded(category.categoryId)) {
      return category.description;
    }
    return this.truncatedDescriptions.get(category.categoryId) ?? category.description;
  }

  shouldShowMore(categoryId: string): boolean {
    return this.showMoreMap.get(categoryId) ?? false;
  }

  private checkDescriptions(): void {
    this.categories.set(this.sharedService.$categories());
    this.categories().forEach((category) => {
      this.calculateDescription(category);
    });
  }

  private calculateDescription(category: Category): void {
    const text = category.description;
    if (!text) {
      this.showMoreMap.set(category.categoryId, false);
      return;
    }

    // Create temporary element for measuring
    const element = document.createElement('p');

    const descriptionElement = document.querySelector<HTMLElement>('.service-description');
    if (!descriptionElement) {
      return;
    }

    const styles = window.getComputedStyle(descriptionElement);

    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.width = `${descriptionElement.clientWidth}px`;

    element.style.fontFamily = styles.fontFamily;
    element.style.fontSize = styles.fontSize;
    element.style.fontWeight = styles.fontWeight;
    element.style.lineHeight = styles.lineHeight;
    element.style.letterSpacing = styles.letterSpacing;
    element.style.padding = '0';
    element.style.margin = '0';

    element.innerText = text;

    document.body.appendChild(element);

    const lineHeight = parseFloat(styles.lineHeight);
    const maxHeight = lineHeight * 2;

    // Fits completely in 2 lines
    if (element.scrollHeight <= maxHeight) {
      this.truncatedDescriptions.set(category.categoryId, text);
      this.showMoreMap.set(category.categoryId, false);

      element.remove();
      return;
    }

    // Doesn't fit → calculate truncated text
    let words = text.split(' ');
    let result = '';

    for (const word of words) {
      const testText = result ? `${result} ${word}` : word;

      element.innerText = `${testText}... Show More`;

      if (element.scrollHeight > maxHeight) {
        break;
      }

      result = testText;
    }

    this.truncatedDescriptions.set(category.categoryId, result.trim());
    this.showMoreMap.set(category.categoryId, true);

    element.remove();
  }
}
