from typing import Any, Dict, List, Optional

class AuthPair:
    def __init__(self):
        self.store: Dict[str, int] = {}
    
    def post(self, access_token: str, id_user: int):
        self.store[access_token] = id_user
    
    def get(self, access_token: str) -> Optional[int]:
        return self.store.get(access_token)
    
    