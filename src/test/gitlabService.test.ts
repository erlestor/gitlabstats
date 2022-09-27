import { getAllMembers, getCommits, getIssuesAutheredBy } from "../services/gitlabService";

const startDate = "2022-09-14T09:13:31.000+02:00";
const endDate = "2022-09-14T13:49:38.000+02:00";
const id = 17450;

describe("Gitlab service", () => {
  it("should be able to get all users in repo", async () => {
    
    const result = await getAllMembers(id);
    expect(result.length).toBeGreaterThan(0);
  });
  
  it("should be able to get all commits in repo", async () => {
    
    const result = await getCommits(id);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should be able to get commits between two dates", async () => {
    
    //Two different times on the inital day of project setup
    const result = await getCommits(id, startDate, endDate);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should be able to get commits since a date", async () => {
    
    //Two different times on the inital day of project setup
    const result = await getCommits(id, startDate);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should be able to get commits until a date", async () => {
    
    //Two different times on the inital day of project setup
    const result = await getCommits(id, undefined, endDate);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should be able to get issues by a specific author", async () => {
    const authorId = 3528; //Eriks id
    const result = await getIssuesAutheredBy(id, authorId, startDate); //really before and after, but we can use the same values
    expect(result.length).toBeGreaterThan(0);
  });
});