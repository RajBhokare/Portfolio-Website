import urllib.request
import json

def test_github():
    print("=== TESTING GITHUB ===")
    try:
        url = "https://github-contributions-api.jogruber.de/v4/RajBhokare?y=last"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            print("GitHub Jogruber total:", data.get('total'))
            print("Contributions length:", len(data.get('contributions', [])))
            if data.get('contributions'):
                print("First contribution:", data['contributions'][0])
                print("Last contribution:", data['contributions'][-1])
    except Exception as e:
        print("GitHub Jogruber failed:", e)

def test_leetcode_graphql():
    print("\n=== TESTING LEETCODE GRAPHQL ===")
    query = """
    query userProfileUserQuestionProgressV2($userSlug: String!) {
        userProfileUserQuestionProgressV2(userSlug: $userSlug) {
            numAcceptedQuestions {
                count
                difficulty
            }
            numFailedQuestions {
                count
                difficulty
            }
            numUntouchedQuestions {
                count
                difficulty
            }
        }
        matchedUser(username: $userSlug) {
            username
            submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                    submissions
                }
                totalSubmissionNum {
                    difficulty
                    count
                    submissions
                }
            }
            userCalendar {
                streak
                totalActiveDays
                submissionCalendar
            }
        }
    }
    """
    body = json.dumps({
        "query": query,
        "variables": {"userSlug": "Rajbhokare"}
    }).encode('utf-8')

    req = urllib.request.Request(
        "https://leetcode.com/graphql/",
        data=body,
        headers={
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Referer": "https://leetcode.com/Rajbhokare/",
            "Origin": "https://leetcode.com"
        }
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            res = json.loads(resp.read().decode())
            print("LeetCode GraphQL Success:")
            print(json.dumps(res, indent=2))
            return res
    except Exception as e:
        print("LeetCode GraphQL direct failed:", e)
        return None

def test_other_leetcode_apis():
    print("\n=== TESTING OTHER LEETCODE PROXIES ===")
    urls = [
        "https://leetcode-api-faisalshohag.vercel.app/Rajbhokare",
        "https://leetcode-rest-api.vercel.app/Rajbhokare",
        "https://leetcodestats.cyclic.app/Rajbhokare",
        "https://alfa-leetcode-api.onrender.com/userProfile/Rajbhokare",
    ]
    for u in urls:
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req, timeout=8) as resp:
                data = json.loads(resp.read().decode())
                print(f"Success {u}: keys={list(data.keys())}")
                if 'totalSolved' in data or 'matchedUser' in data or 'totalQuestions' in data or 'submissionCalendar' in data:
                    print("Sample:", str(data)[:200])
        except Exception as e:
            print(f"Failed {u}: {e}")

if __name__ == '__main__':
    test_github()
    test_leetcode_graphql()
    test_other_leetcode_apis()
