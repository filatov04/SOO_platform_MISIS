from typing import Any, Dict, List, Optional
import time
from shared.settings import app_settings

class AuthPair:
    def __init__(self):
        self.store: Dict[str, int] = {}
        self.last_cleanup = time.time()
    
    def post(self, access_token: str, user_id: int):
        self.store[access_token] = user_id
    
    def get(self, access_token: str) -> Optional[int]:
        return self.store.get(access_token)
    
    def cleanup(self):
        if time.time() - self.last_cleanup > 21600:
            self.last_cleanup = time.time()
            for token in self.store.keys():
                if time.time() - self.store[token] > app_settings.jwt_access_expire_time:
                    del self.store[token]
