// TypeScript Type Definitions Barrel Export
// Centralized type definitions for the entire application

/**
 * Navigation Link Item
 */
export interface NavLink {
  name: string;
  id: string;
  href?: string;
}

/**
 * Section ID type (for scroll navigation)
 */
export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'competitions'
  | 'certificates';

// Additional types to create in future phases:
// export type { Project, Technology } from './project';
// export type { Certificate } from './certificate';
// export type { Competition } from './competition';
// export type { Skill, SkillCategory } from './skill';
