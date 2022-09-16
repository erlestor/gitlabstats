import { getAllCommitsOfUser, getAllMembers, getCommits } from "../services/gitlabService";

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
  it("should be able to get all commits belonging to a specific user", async () => {
    const id = 17450;
    //sondreso user id should get results
    const userId = 3586;
    const result = await getAllCommitsOfUser(id, userId);
    expect(result.length).toBeGreaterThan(0);
  });
});
