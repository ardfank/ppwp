#!/bin/bash
m=$(date +"%M")
if [ $m -lt 5 ]; then
echo "===$(date) Start ===\n" > /mnt/log/game/ppwp/cron.log
fi
/usr/bin/git -C /mnt/log/game/ppwp/ pull origin main
sleep 5
echo "===$(date) 1st ===\n" >> /mnt/log/game/ppwp/cron.log
/usr/bin/php /mnt/log/game/ppwp/json/prov.php >> /mnt/log/game/ppwp/cron.log
/usr/bin/git -C /mnt/log/game/ppwp/ add .
/usr/bin/git -C /mnt/log/game/ppwp/ commit -m "Auto `date "+ %A, %d-%m-%Y %H.%M.%S"`"
/usr/bin/git -C /mnt/log/game/ppwp/ push
sleep 5
/usr/bin/git -C /mnt/log/game/ppwp/ pull origin main
sleep 5
echo "===$(date) 2nd ===\n" >> /mnt/log/game/ppwp/cron.log
/usr/bin/php /mnt/log/game/ppwp/json/prov.php >> /mnt/log/game/ppwp/cron.log
/usr/bin/git -C /mnt/log/game/ppwp/ add .
/usr/bin/git -C /mnt/log/game/ppwp/ commit -m "Auto `date "+ %A, %d-%m-%Y %H.%M.%S"`"
/usr/bin/git -C /mnt/log/game/ppwp/ push
exit 0
