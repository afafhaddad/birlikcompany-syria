import re
import json
import os

prompt = """
<img width="1080" height="1350" alt="Image" src="https://github.com/user-attachments/assets/0e72a660-6ffe-47d6-8262-bb27e51c34e5" />
<img width="3168" height="1344" alt="Image" src="https://github.com/user-attachments/assets/6d8c24ae-9348-4324-8b1b-b57eca194c59" />
<img width="3168" height="1344" alt="Image" src="https://github.com/user-attachments/assets/5e13fa3b-a1b7-4648-b9dd-12d9b3c708e6" />
<img width="3168" height="1344" alt="Image" src="https://github.com/user-attachments/assets/0cbe2e12-5d18-46a2-8737-8178ae297c12" />
<img width="3168" height="1344" alt="Image" src="https://github.com/user-attachments/assets/3187a583-072b-4fd8-a4e5-f98a97289e4b" />
<img width="3168" height="1344" alt="Image" src="https://github.com/user-attachments/assets/41d631d2-9645-4bf3-863a-2389639ab96b" />
<img width="2752" height="1536" alt="Image" src="https://github.com/user-attachments/assets/6c424ecb-b2c6-4d0a-a667-ab243bfd62e6" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/b74d8656-af82-4c6c-9beb-1b19b9c07e50" />
<img width="1080" height="1080" alt="Image" src="https://github.com/user-attachments/assets/3dd35ab7-d49d-4348-b6f2-faf859043a00" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/eccdd746-67a2-4314-9693-34dcb5e43a1b" />
<img width="600" height="600" alt="Image" src="https://github.com/user-attachments/assets/4991cb9e-1c24-4e3b-8ecc-8bb719e3bd47" />
<img width="736" height="801" alt="Image" src="https://github.com/user-attachments/assets/6b264d31-ce18-4c90-aaef-338dac491ee1" />
<img width="1080" height="650" alt="Image" src="https://github.com/user-attachments/assets/f51ad32f-371b-4e6e-b713-983e86b9f697" />
<img width="1080" height="650" alt="Image" src="https://github.com/user-attachments/assets/549fc811-cc68-4c1e-8393-c00be41b4bb6" />
<img width="828" height="591" alt="Image" src="https://github.com/user-attachments/assets/10804937-c287-43ae-a043-e90cdebe1aaf" />
<img width="828" height="585" alt="Image" src="https://github.com/user-attachments/assets/447fed5e-9bf8-47ee-a720-b0b0ba8758b6" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/0af2a75c-e5d8-4340-81b2-228ec6c32b79" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/d5fe9b02-9ab8-475c-825a-dfcf51caefee" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/afc2cd46-6c7a-450c-a23e-a7d13bd2ec95" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/19605678-02ed-4333-b786-ebf6c525c486" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/322abcf2-7e51-43b6-bbe8-a05ac66e8ee2" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/38603eea-06bc-456d-9252-f4c08be2a17f" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/bd9f2c69-efde-4100-b6ee-9fa788aba506" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/5b623a2b-3b43-4fd0-a138-6694b66dab2a" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/fe22f53a-728f-4c49-80b0-4e37fc57420a" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/40d8a98c-8c42-4938-a9b8-fadd87509ce5" />
<img width="2390" height="1792" alt="Image" src="https://github.com/user-attachments/assets/64290b4b-72fb-41ff-b2fe-6a8f7e2a25cb" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/88e1ee51-f12b-48c9-b58d-462f67be951a" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/c01f0998-ab0b-4488-93e9-3229ac37ffc4" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/2076f8c8-d03b-40b1-8c68-82425d3fb398" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/cd81462b-009b-4759-a984-8e9351553ae7" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/de321334-0e1e-4e8a-a952-60a102b2e0a1" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/9e2bee7c-4c19-4be5-8c84-526251b20578" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/67108f64-1e6d-42ac-87b0-f113ee87caeb" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/3c78d8aa-8774-41f0-92c8-bd7c66b9d495" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/58920149-96a2-4f56-bfbd-ab0b0315b701" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/9db769bb-368e-4754-96c0-7cb19661ff74" />
<img width="1586" height="992" alt="Image" src="https://github.com/user-attachments/assets/d8f024e5-6ae7-4ee5-9d13-53c21ed75328" />
<img width="1448" height="1086" alt="Image" src="https://github.com/user-attachments/assets/252b00a4-7e48-43a6-98c9-53c280ccf541" />
<img width="1448" height="1086" alt="Image" src="https://github.com/user-attachments/assets/a9cd59a5-db4f-49a9-9d12-d71ab550eccd" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/c57c90ef-451e-4337-8027-4163eb2d5006" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/b8bfc622-340f-4250-95ae-ac3276e8bbe2" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/918cbeb6-76ca-407f-8749-f3277cec6019" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/1746b584-1984-446b-9169-e576f8c4a19e" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/0fa02fde-86b9-40f7-abf3-407131395b2b" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/78565266-d761-493d-803c-ce18735b3aaa" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/3100dd0e-a289-4466-bfb0-dda9c0db3e37" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/94f141ce-6f45-40f4-9c60-e82716a989dc" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/79355431-d461-4b18-8b40-c056c540f01f" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/ec9b5603-5d13-4f1f-a385-fbd3f8a44ef8" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/652a1e64-e817-4fb2-a328-2446f4518335" />
<img width="1173" height="912" alt="Image" src="https://github.com/user-attachments/assets/fadc22a0-eb16-430c-9b41-2a92dbc41120" />
<img width="1173" height="912" alt="Image" src="https://github.com/user-attachments/assets/b49fe485-f8f3-40ac-a995-bf825d2af09e" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/36de8113-b3b5-4bc4-b53d-137018aebd49" />
<img width="1199" height="1600" alt="Image" src="https://github.com/user-attachments/assets/fa22e290-eb7c-403d-bf91-25d24005dfb5" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/58f3133e-c712-4001-ad92-59ed813770f1" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/f3bb8076-fe5a-4baa-a3fe-ad4b29f7abfb" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/bd9ce2bd-f9c2-4a8c-a1a5-5af22cce18f7" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/bf297b9e-5deb-4f48-9f5a-6673d9acbf96" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/93729bd2-35b8-4d83-bc59-3b2ca37d4999" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/f4bbff82-ec66-48e0-9018-7a7bbba1ce92" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/a9203544-468d-40ea-91bf-df2554f1ce7d" />
<img width="1536" height="2048" alt="Image" src="https://github.com/user-attachments/assets/3639147a-192c-43bc-8536-5bab37d15c60" />
<img width="1600" height="872" alt="Image" src="https://github.com/user-attachments/assets/5f047287-63ca-42fd-b0cd-f65a8896b708" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/0f5e8bc4-bdd1-4f95-a23d-b23b66d43dd8" />
<img width="1199" height="1600" alt="Image" src="https://github.com/user-attachments/assets/146c0375-b7ef-40e1-9a26-eb302fcf6d71" />
<img width="1199" height="1600" alt="Image" src="https://github.com/user-attachments/assets/f88a7821-cf61-4dbb-b0c7-50b1f0435bfa" />
<img width="1199" height="1600" alt="Image" src="https://github.com/user-attachments/assets/70c15c6d-5f24-41ee-9efd-7cfa542b987d" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/c00a17f2-1044-4952-ab2b-2ccfbbf3c2eb" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/541f7685-542b-4ab7-9667-1a41aecd7f44" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/51d29161-f9ae-46bd-ac25-dc07b2982c31" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/b45bfea5-4a4a-44c6-9d8b-1f73e78ec544" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/10b50c65-8888-48e9-9d4f-c1b54fb11bf4" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/70ed9845-a93e-47cc-aa5f-b3bff10a7fd3" />
<img width="1312" height="816" alt="Image" src="https://github.com/user-attachments/assets/0754907c-e317-4773-bb24-53b7994fd571" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/553046f9-b40f-479f-b2bb-eb11011e272d" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/db1cc6ca-482a-444f-9d15-bc2b46b37e97" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/3f53e84c-5cee-4fac-823f-3638fe03e6e4" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/57101c1b-b38f-4419-909f-57f07d563209" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/00932991-ebec-4e91-a821-baf481afa2d3" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/e368a11d-c114-4055-b8dc-ceaab41c44f0" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/5b8e6222-7c9f-4bb4-880d-5beb3ed070ed" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/ada4ea66-4a52-45a5-a7fc-54201b7217c5" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/569370ea-f58e-4b04-8297-9afebfd03b4c" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/0dd313b8-c854-4f5e-98ae-f3248339f8a6" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/8ba87846-f386-43dd-a169-f93e36ec9188" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/1da50b04-724c-4c67-8977-153ee8980830" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/be722e47-fde8-4a78-b874-48858f265b2e" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/39eef2c5-9f81-4058-bf2a-e21bfe5431ec" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/66a69d0f-5e92-4792-ad22-53eaaf42d3c2" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/5cea0d70-f724-4b98-b161-6ca593c2b949" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/f7d4663d-9c92-4fde-832c-609989193816" />
<img width="2624" height="1632" alt="Image" src="https://github.com/user-attachments/assets/88adad2a-54a1-45d5-baa3-4f6ede6aac9c" />
"""

urls = re.findall(r'src=["\x27](https://github\.com/user-attachments/assets/[^"\x27]+)["\x27]', prompt)
print("Found", len(urls), "URLs")

with open("src/data/mediaRegistry.json", "r") as f:
    reg = json.load(f)

existing = {x["url"] for x in reg.get("uploadedImages", [])}
new_items = []
for i, u in enumerate(urls):
    if u not in existing:
        asset_id = u.split("/")[-1]
        new_items.append({
            "id": "gh_" + asset_id,
            "url": u,
            "name": f"Birlik Photo {i+1}",
            "uploadedAt": "2026-09-30T12:00:00Z"
        })
        existing.add(u)

reg["uploadedImages"] = new_items + reg.get("uploadedImages", [])

with open("src/data/mediaRegistry.json", "w") as f:
    json.dump(reg, f, indent=2, ensure_ascii=False)

print("Successfully registered", len(new_items), "GitHub images in mediaRegistry.json!")
