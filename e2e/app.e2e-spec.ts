import { ProjectFirebasePage } from './app.po';

describe('project-firebase App', () => {
  let page: ProjectFirebasePage;

  beforeEach(() => {
    page = new ProjectFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
