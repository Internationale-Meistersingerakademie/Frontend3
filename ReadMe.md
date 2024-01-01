<div align="center">
<h1>
   <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" height="100" />
   <br>
   IMA Website
</h1>
<i> New, improved and with Nuxt.</i>
<h3>Developed with:</h3>

<p align="center">
<img src="https://img.shields.io/badge/Sass-CC6699.svg?style=flat&logo=Sass&logoColor=white" alt="Sass">
<img src="https://img.shields.io/badge/Vue.js-4FC08D.svg?style=flat&logo=vuedotjs&logoColor=white" alt="Vue.js">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/GitHub-181717.svg?style=flat&logo=GitHub&logoColor=white" alt="GitHub">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" alt="Markdown">
</p>

![repo-language-count](https://img.shields.io/github/languages/count/Internationale-Meistersingerakademie/Frontend3?style=flat&labelColor=E5E4E2&color=869BB3)
![repo-top-language](https://img.shields.io/github/languages/top/Internationale-Meistersingerakademie/Frontend3?style=flat&labelColor=E5E4E2&color=869BB3)
![last-commit](https://img.shields.io/github/last-commit/Internationale-Meistersingerakademie/Frontend3?style=flat&labelColor=E5E4E2&color=869BB3)
</div>

---

##  Quick Links
- [ Quick Links](#-quick-links)
- [ Overview](#-overview)
- [ Repository Structure](#-repository-structure)
- [ Getting Started](#-getting-started)
    - [ Installation](#-installation)
    - [ Running Frontend3](#-running-Frontend3)
    - [ Tests](#-tests)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

The IMA Website is a project to create a new website for the Internationale Meistersingerakademie. It is based on the [Nuxt.js](https://nuxtjs.org/) framework and uses [Vue.js](https://vuejs.org/) as its frontend framework.

---


##  Repository Structure

```
└── Frontend3/
    ├── app.vue
    ├── components/
    │   ├── Footer.vue
    │   ├── Navigation.vue
    │   ├── ScholarshipBanner.vue
    │   ├── application/
    │   │   └── Bewerbung.vue
    │   ├── contact/
    │   │   └── Contact.vue
    │   ├── course/
    │   │   ├── Kursbeschreibung.vue
    │   │   ├── Repertoire.vue
    │   │   ├── Teilnehmer.vue
    │   │   └── Veranstaltungen.vue
    │   ├── faculty/
    │   │   ├── LehrerCategories.vue
    │   │   └── LehrerList.vue
    │   ├── helper/
    │   │   └── MarkdownStringRenderer.vue
    │   ├── home/
    │   │   ├── MediaPreview.vue
    │   │   ├── NewsLehrer.vue
    │   │   ├── SocialMedia.vue
    │   │   ├── Vorsingen.vue
    │   │   └── WelcomeVideo.vue
    │   ├── legal/
    │   │   └── Legal.vue
    │   ├── network/
    │   │   └── Netzwerk.vue
    │   ├── news/
    │   │   └── News.vue
    │   └── sponsors/
    │       └── Sponsoren.vue
    ├── ecosystem.config.cjs
    ├── i18n.config.ts
    ├── nuxt.config.ts
    ├── package.json
    ├── pages/
    │   ├── Application.vue
    │   ├── Contact.vue
    │   ├── Course.vue
    │   ├── Datenschutz.vue
    │   ├── Faculty.vue
    │   ├── Impressum.vue
    │   ├── Media.vue
    │   ├── Network.vue
    │   ├── News.vue
    │   ├── Sponsors.vue
    │   └── index.vue
    ├── plugins/
    │   └── content.ts
    ├── public/
    └── tsconfig.json

```

---

##  Getting Started

***Prerequisites***

Ensure you have the following dependencies installed on your system:

- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- (optional) (bun)[https://bun.sh/]
-

###  Installation

1. Clone the Frontend3 repository:
```sh
git clone https://github.com/Internationale-Meistersingerakademie/Frontend3
```

2. Change to the project directory:
```sh
cd Frontend3
```

3. Install the dependencies:
```sh
bun install
```

###  Running Frontend3
Use the following command to run Frontend3:
```sh
bun run start
```


---

##  Acknowledgments

- Lots of the Frontend Style is written by [Elias Ghorwall](https://github.com/eliasghorwall)

[**Return**](#-quick-links)

---
