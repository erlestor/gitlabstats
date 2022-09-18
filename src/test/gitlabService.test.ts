import { getAllCommitsOfUser, getAllMembers, getCommits, getCommitsByDates } from "../services/gitlabService";

describe("Gitlab service", () => {
  it("should be able to get all users in repo", async () => {
    const id = 17450;
    const result = await getAllMembers(id);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should be able to get all commits in repo", async () => {
    const id = 17450;
    const result = await getCommits(id);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should be able to get commits between two dates", async () => {
    const id = 17450;
    //Two different times on the inital day of project setup
    const startDate = "2022-09-14T09:13:31.000+02:00";
    const endDate = "2022-09-14T13:49:38.000+02:00";
    const result = await getCommitsByDates(id, startDate, endDate);
    expect(result.length).toBeGreaterThan(0);
  });
});
