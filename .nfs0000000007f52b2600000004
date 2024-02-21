 
#!/bin/bash
/usr/bin/git -C /mnt/log/game/ppwp/ pull origin main
/usr/bin/php /mnt/log/game/ppwp/json/prov.php
/usr/bin/git -C /mnt/log/game/ppwp/ add .
/usr/bin/git -C /mnt/log/game/ppwp/ commit -m "Auto `date "+ \%A, \%d-\%m-\%Y \%H.\%M.\%S"`"
/usr/bin/git -C /mnt/log/game/ppwp/ push
sleep 5
/usr/bin/git -C /mnt/log/game/ppwp/ pull origin main
/usr/bin/php /mnt/log/game/ppwp/json/prov.php
/usr/bin/git -C /mnt/log/game/ppwp/ add .
/usr/bin/git -C /mnt/log/game/ppwp/ commit -m "Auto `date "+ \%A, \%d-\%m-\%Y \%H.\%M.\%S"`"
/usr/bin/git -C /mnt/log/game/ppwp/ push
exit 0